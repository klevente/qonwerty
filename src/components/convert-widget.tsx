import { ChangeEvent, useRef, useState, type FC } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RotateCcw } from "lucide-react";

interface Unit {
  name: string;
  default: number;
}

export interface ConvertWidgetProps {
  unitA: Unit;
  unitB: Unit;
  convertAtoB: (v: number) => number;
  convertBtoA: (v: number) => number;
}

export const ConvertWidget: FC<ConvertWidgetProps> = ({
  unitA,
  unitB,
  convertAtoB,
  convertBtoA,
}) => {
  const [unitAValue, setUnitAValue] = useState(unitA.default);
  const [unitBValue, setUnitBValue] = useState(convertAtoB(unitA.default));
  const unitARef = useRef<HTMLInputElement>(null);

  const handleUnitAChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUnitA = parseFloat(e.target.value);
    const newUnitB = convertAtoB(newUnitA);
    setUnitAValue(newUnitA);
    setUnitBValue(newUnitB);
  };

  const handleUnitBChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newUnitB = parseFloat(e.target.value);
    const newUnitA = convertBtoA(newUnitB);
    setUnitAValue(newUnitA);
    setUnitBValue(newUnitB);
  };

  const onResetClick = () => {
    setUnitAValue(unitA.default);
    setUnitBValue(convertAtoB(unitA.default));
    unitARef.current?.focus();
  };
  return (
    <div className="flex gap-5 items-center justify-center">
      <div className="flex items-center gap-2">
        <Input
          ref={unitARef}
          type="number"
          placeholder={unitA.name}
          value={unitAValue}
          onChange={handleUnitAChange}
          className="w-16"
        />
        <small>{unitA.name}</small>
      </div>
      <small>=</small>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={unitB.name}
          value={unitBValue}
          onChange={handleUnitBChange}
          className="w-16"
        />
        <small>{unitB.name}</small>
      </div>
      <Button onClick={onResetClick} variant="outline" size="icon">
        <RotateCcw className="h-4 w-8" />
      </Button>
    </div>
  );
};
