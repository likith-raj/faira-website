import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Live train status for the /demos/train-voice demo.
 * Data source: "Indian Railway IRCTC" on RapidAPI (free tier).
 * RAPIDAPI_TRAIN_URL overrides the whole request (host, path and query names) when the
 * app changes its endpoint — the {no} token is replaced with the train number.
 */
const HOST = () => (process.env.RAPIDAPI_HOST ?? "indian-railway-irctc.p.rapidapi.com").trim();
const REQUEST_URL = (no: string) =>
  (process.env.RAPIDAPI_TRAIN_URL ?? `https://${HOST()}/api/v1/liveTrainStatus?trainNo={no}&startDay=0`)
    .trim()
    .replace("{no}", no);

function trainNumber(raw: string | null): string | null {
  const match = String(raw ?? "").match(/\d{4,6}/);
  return match ? match[0] : null;
}

function pick(data: any, keys: string[]): any {
  for (const key of keys) {
    const value = key.split(".").reduce((acc: any, part) => (acc == null ? acc : acc[part]), data);
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function toStatus(no: string, json: any) {
  const name = pick(json, [
    "data.train_name",
    "data.trainName",
    "train_name",
    "trainName",
    "status.train_name",
    "result.train_name"
  ]);
  const position = pick(json, [
    "data.current_station_name",
    "data.current_station",
    "current_station_name",
    "currentStationName",
    "lastArrivedStation"
  ]);
  const delay = pick(json, ["data.delay", "data.delay_in_minutes", "delay", "delayArr", "delayArrival"]);
  const message = pick(json, ["data.message", "message", "status.message"]);

  const parts = [`Train ${no}`];
  if (name) parts.push(String(name));
  if (position) parts.push(`currently at ${position}`);
  if (delay !== undefined) parts.push(`${delay} minutes late`);
  let text = parts.filter(Boolean).join(", ");
  if (message && (delay === undefined || position === undefined)) text += `. ${message}`;
  return { name: name ? String(name) : null, position: position ? String(position) : null, delay, text };
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
    text: `Train ${no}${known?.name ? `, ${known.name}` : ""} is near ${known?.position ?? "the last reported station"}, ${known?.delay ?? "delay unknown"}.`
  };
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
    const sample = sampleFor(no);
    return NextResponse.json({
      ok: true,
      source: "sample",
      trainNo: no,
      ...sample,
      note: "RAPIDAPI_KEY is not set — this is labelled sample data, not live railway data."
    });
  }

  try {
    const res = await fetch(REQUEST_URL(no), {
      headers: {
        "x-rapidapi-key": key,
        "x-rapidapi-host": HOST()
      },
      signal: AbortSignal.timeout(12000),
      cache: "no-store"
    });
    const json: any = await res.json().catch(() => null);

    if (!res.ok || !json) {
      const detail = `HTTP ${res.status} ${json?.error ?? json?.message ?? ""}`.trim();
      const hint =
        res.status === 404
          ? " This RapidAPI app has no such endpoint — subscribe to the app with this key and copy its exact request URL into RAPIDAPI_TRAIN_URL."
          : res.status === 401 || res.status === 403
            ? " RapidAPI rejected this key — check RAPIDAPI_KEY and the subscription on rapidapi.com."
            : "";
      const sample = sampleFor(no);
      return NextResponse.json({
        ok: true,
        source: "sample",
        trainNo: no,
        ...sample,
        note: `Live railway API did not answer (${detail}).${hint} Showing sample data (not live).`
      });
    }

    const status = toStatus(no, json);
    if (!status.name && !status.position && !status.delay) {
      const sample = sampleFor(no);
      return NextResponse.json({
        ok: true,
        source: "sample",
        trainNo: no,
        ...sample,
        note: "The live railway API returned no readable status. Showing sample data (not live)."
      });
    }
    return NextResponse.json({
      ok: true,
      source: "rapidapi",
      trainNo: no,
      ...status,
      rawStatus: pick(json, ["status", "result"]) ?? null
    });
  } catch (err: any) {
    const sample = sampleFor(no);
    return NextResponse.json({
      ok: true,
      source: "sample",
      trainNo: no,
      ...sample,
      detail: String(err?.message ?? err),
      note: "Could not reach the live railway API. Showing sample data (not live)."
    });
  }
}