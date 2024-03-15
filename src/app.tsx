import { type FC } from "react";

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
        <ConvertWidget
          unitA={{
            name: "°C",
            default: 20,
          }}
          unitB={{
            name: "°F",
            default: celsiusToFahrenheit(20),
          }}
          convertAtoB={celsiusToFahrenheit}
          convertBtoA={fahrenheitToCelsius}
        />
        <Separator className="my-4 col-span-4" />
        <ConvertWidget
          unitA={{
            name: "kg",
            default: 100,
          }}
          unitB={{
            name: "lbs",
            default: kgToLbs(100),
          }}
          convertAtoB={kgToLbs}
          convertBtoA={lbsToKg}
        />
        <Separator className="my-4 col-span-4" />
        <ConvertWidget
          unitA={{
            name: "km/h",
            default: 90,
          }}
          unitB={{
            name: "mph",
            default: kmhToMph(90),
          }}
          convertAtoB={kmhToMph}
          convertBtoA={mphToKmh}
        />
      </div>
    </div>
  );
};
