import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Live train status for the /demos/train-voice demo.
 * Data source: "Indian Railway IRCTC" on RapidAPI (free tier).
 *
 * Verified against the live API on 2026-11-03: the status endpoint answers 200 with real
 * data only when isH5=true and client=web are sent — without them it returns
 * 400 "'Live Train Status' feature is not supported on this version". There is no search
 * endpoint on this app (all /search, /detail, /train paths return 404 "Endpoint does not
 * exist"), so the train number is passed directly; no internal train_id step is needed.
 * RAPIDAPI_TRAIN_URL can point at a different base path if the app moves.
 */
const HOST = () => (process.env.RAPIDAPI_HOST ?? "indian-railway-irctc.p.rapidapi.com").trim();

const STATUS_PATH = "/api/trains/v1/train/status";

function istDate(): string {
  const now = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  return `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}`;
}

function requestUrl(no: string, date: string): string {
  // The env value may carry a query string of its own; the tokens we need are appended either way.
  const base = (process.env.RAPIDAPI_TRAIN_URL ?? `https://${HOST()}${STATUS_PATH}`).trim().split("?")[0];
  const query = new URLSearchParams({
    train_number: no,
    departure_date: date,
    isH5: "true",
    client: "web"
  });
  return `${base}?${query.toString()}`;
}

function trainNumber(raw: string | null): string | null {
  const match = String(raw ?? "").match(/\d{4,6}/);
  return match ? match[0] : null;
}

function travelDate(raw: string | null): string {
  const digits = String(raw ?? "").replace(/\D/g, "");
  return /^\d{8}$/.test(digits) ? digits : istDate();
}

const stripTags = (value: string) => value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

function minutes(hhmm: string | undefined): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(String(hhmm ?? "").trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

type Station = {
  code: string;
  name: string;
  serial: number;
  arrival: string;
  arrivalLate: number | null;
};

function parseStations(rows: any): Station[] {
  if (!Array.isArray(rows)) return [];
  return rows.map((r: any, i: number) => {
    const scheduled = minutes(r?.arrivalTime);
    const actual = minutes(r?.actual_arrival_time);
    // A station reached on a later day of the journey is not comparable minute-to-minute.
    const sameDay = !r?.actual_arrival_date || String(r.actual_arrival_date) === String(r?.arrival_date ?? r?.actual_arrival_date);
    const late = scheduled !== null && actual !== null && sameDay ? actual - scheduled : null;
    return {
      code: String(r?.stationCode ?? "").trim(),
      name: String(r?.stationName ?? r?.stationCode ?? "").trim(),
      serial: Number(r?.stnSerialNumber ?? i + 1) || i + 1,
      arrival: String(r?.arrivalTime ?? "").trim(),
      arrivalLate: late !== null && late >= 0 && late < 720 ? late : null
    };
  });
}

function toStatus(no: string, json: any) {
  const body = json?.body ?? json?.data ?? json ?? {};
  const stations = parseStations(body?.stations);
  const message = body?.train_status_message ? stripTags(String(body.train_status_message)) : "";
  const currentCode = String(body?.current_station ?? "").trim();
  const matched = stations.find((s) => s.code === currentCode);
  const position = matched?.name || (currentCode ? currentCode : "");

  // The freshest lateness we can prove: the current station, else the last station already passed.
  const late =
    matched?.arrivalLate ??
    stations.reduce((best: number | null, s) => (s.arrivalLate !== null && s.serial <= (matched?.serial ?? Infinity) ? Math.max(best ?? 0, s.arrivalLate) : best), null);

  const next = stations.filter((s) => s.serial > (matched?.serial ?? 0) && s.code !== currentCode)[0];

  const clean = (sentence: string) => sentence.replace(/[.\s]+$/, "").trim();
  const sentences: string[] = [];
  if (position) sentences.push(`Train ${no} is currently at ${position}`);
  else sentences.push(`Train ${no} has not reported a position yet`);
  if (body?.terminated) sentences.push("It has finished its run for today");
  else if (late !== null) sentences.push(late === 0 ? "It is running on time" : `It is running about ${late} minutes late`);
  if (message) sentences.push(message);
  if (position && next?.arrival) sentences.push(`Next stop is ${next.name}, scheduled ${next.arrival}`);

  const text = `${sentences.map(clean).filter(Boolean).join(". ")}.`;

  return {
    name: null as string | null,
    position: position || null,
    delay: late === null ? null : late === 0 ? "on time" : `${late} minutes late`,
    nextStop: next?.name ?? null,
    message: message || null,
    stationCount: stations.length,
    text
  };
}

const SAMPLE: Record<string, { name: string; position: string; delay: string }> = {
  "12759": { name: "Charminar Express", position: "Vijayawada Junction", delay: "15 minutes late" },
  "12715": { name: "Andhra Pradesh Express", position: "Kazipet", delay: "on time" },
  "12603": { name: "Masur Express", position: "Miraj", delay: "20 minutes late" }
};

function sampleFor(no: string) {
  const known = SAMPLE[no];
  return {
    name: known?.name ?? null,
    position: known?.position ?? "the last reported station",
    delay: known?.delay ?? "unknown",
    nextStop: null,
    message: null,
    stationCount: 0,
    text: `Train ${no}${known?.name ? `, ${known.name}` : ""} is near ${known?.position ?? "the last reported station"}, ${known?.delay ?? "delay unknown"}.`
  };
}

function sample(no: string, reason: string) {
  return NextResponse.json({
    ok: true,
    source: "sample",
    label: "Sample (API error)",
    trainNo: no,
    ...sampleFor(no),
    note: `Sample (API error) — ${reason}`
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const no = trainNumber(url.searchParams.get("train") ?? url.searchParams.get("train_no"));

  if (!no) {
    return NextResponse.json({
      ok: false,
      source: "bad-request",
      text: "Give me a 4 to 6 digit train number, for example 12759."
    });
  }

  const key = (process.env.RAPIDAPI_KEY ?? "").trim();
  if (!key) {
    return sample(no, "RAPIDAPI_KEY is not set, so this is sample data, not live railway data.");
  }

  const date = travelDate(url.searchParams.get("date"));

  try {
    const res = await fetch(requestUrl(no, date), {
      headers: { "x-rapidapi-key": key, "x-rapidapi-host": HOST() },
      signal: AbortSignal.timeout(15000),
      cache: "no-store"
    });
    const json: any = await res.json().catch(() => null);

    if (!res.ok || !json) {
      const detail = `HTTP ${res.status} ${json?.error ?? json?.status?.message?.message ?? ""}`.trim();
      const hint =
        res.status === 404
          ? " The request URL is not on this app — copy the exact endpoint from your RapidAPI dashboard into RAPIDAPI_TRAIN_URL."
          : res.status === 401 || res.status === 403
            ? " RapidAPI rejected this key — check RAPIDAPI_KEY and the subscription on rapidapi.com."
            : "";
      return sample(no, `the live railway API refused the request (${detail}).${hint}`);
    }

    const failed = json?.status?.result === "failure" || (json?.error && json?.error !== "null");
    const status = toStatus(no, json);
    if (failed || (!status.position && !status.message && !status.stationCount)) {
      const why = json?.status?.message?.message ?? json?.error ?? "no readable status";
      return sample(no, `the live API reported no data for ${no} on ${date} (${String(why).slice(0, 120)}).`);
    }

    return NextResponse.json({
      ok: true,
      source: "rapidapi",
      label: "Live",
      trainNo: no,
      departureDate: date,
      fetchedAt: json?.body?.server_timestamp ?? null,
      ...status
    });
  } catch (err: any) {
    return sample(no, `could not reach the live railway API (${String(err?.message ?? err).slice(0, 120)}).`);
  }
}
