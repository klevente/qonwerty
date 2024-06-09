import type { FC } from "react";

import { ThemeToggle } from "@/components/theme-toggle.tsx";
import { ConvertWidget } from "@/components/convert-widget.tsx";
import { Separator } from "@/components/ui/separator.tsx";

function celsiusToFahrenheit(c: number): number {
  return +((c * 9) / 5 + 32).toFixed(1);
}

function fahrenheitToCelsius(f: number): number {
  return +(((f - 32) * 5) / 9).toFixed(1);
}

function kgToLbs(kg: number): number {
  return +(kg * 2.20462).toFixed(1);
}

function lbsToKg(lbs: number): number {
  return +(lbs / 2.20462).toFixed(1);
}

function mphToKmh(mph: number): number {
  return +(mph * 1.60934).toFixed(1);
}

function kmhToMph(kmh: number): number {
  return +(kmh / 1.60934).toFixed(1);
}

function l100kmToMpg(l100km: number): number {
  return +(235.214 / l100km).toFixed(1);
}

function mpgToL100km(mpg: number): number {
  return +(235.214 / mpg).toFixed(1);
}

function sqFtToSqM(sqft: number): number {
  return +(sqft / 10.764).toFixed(1);
}

function sqMToSqFt(sqm: number): number {
  return +(sqm * 10.764).toFixed(1);
}

function mlToFlOz(ml: number): number {
  return +(ml * 0.033814).toFixed(1);
}

function flOzToMl(fluidOunces: number): number {
  return +(fluidOunces / 0.033814).toFixed(1);
}

function cupsToMl(cups: number): number {
  return +(cups * 240).toFixed(1);
}

function mlToCups(ml: number): number {
  return +(ml / 240).toFixed(1);
}

const UNIT_PAIRS = [
  {
    unitA: "°C",
    unitB: "°F",
    default: 20,
    aToB: celsiusToFahrenheit,
    bToA: fahrenheitToCelsius,
  },
  {
    unitA: "kg",
    unitB: "lbs",
    default: 100,
    aToB: kgToLbs,
    bToA: lbsToKg,
  },
  {
    unitA: "km/h",
    unitB: "mph",
    default: 90,
    aToB: kmhToMph,
    bToA: mphToKmh,
  },
  {
    unitA: "l/Ckm",
    unitB: "mpg",
    default: 8,
    aToB: l100kmToMpg,
    bToA: mpgToL100km,
  },
  {
    unitA: "m^2",
    unitB: "ft^2",
    default: 100,
    aToB: sqMToSqFt,
    bToA: sqFtToSqM,
  },
  {
    unitA: "ml",
    unitB: "fl oz",
    default: 1000,
    aToB: mlToFlOz,
    bToA: flOzToMl,
  },
  {
    unitA: "cups",
    unitB: "ml",
    default: 1,
    aToB: cupsToMl,
    bToA: mlToCups,
  },
] as const;

export const App: FC = () => {
  return (
    <div className="max-w-xl m-auto mt-10 px-2">
      <nav className="flex justify-between">
        <a href="/">
          <h4 className="flex gap-2 items-center font-serif">
            <img className="inline w-8 h-8 img-pixelated" src="/favicon.ico" alt="logo" />
            Qonwerty
          </h4>
        </a>
        <ThemeToggle />
      </nav>
      <div className="grid grid-cols-[35%_15%_35%_15%] items-center mt-4">
        {UNIT_PAIRS.map((pair, i) => (
          <>
            {i > 0 && <Separator key={`sep-${i}`} className="my-4 col-span-4" />}
            <ConvertWidget
              key={`conv-${i}`}
              unitAName={pair.unitA}
              unitBName={pair.unitB}
              defaultA={pair.default}
              convertAtoB={pair.aToB}
              convertBtoA={pair.bToA}
            />
          </>
        ))}
      </div>
    </div>
  );
};
