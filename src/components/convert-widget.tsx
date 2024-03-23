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
    <>
      <div className="flex items-center gap-2">
        <Input
          ref={unitARef}
          type="number"
          placeholder={unitA.name}
          value={unitAValue}
          onChange={handleUnitAChange}
          className="w-24 font-mono"
        />
        <UnitDisplay unitName={unitA.name} />
      </div>
      <small className="justify-self-center md:justify-self-start font-light">=</small>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          placeholder={unitB.name}
          value={unitBValue}
          onChange={handleUnitBChange}
          className="w-24 font-mono"
        />
        <UnitDisplay unitName={unitB.name} />
      </div>
      <Button className="justify-self-end" onClick={onResetClick} variant="outline" size="icon">
        <RotateCcw className="h-4 w-8" />
      </Button>
    </>
  );
};

interface UnitDisplayProps {
  unitName: string;
}

const UnitDisplay: FC<UnitDisplayProps> = ({ unitName }) => {
  const [nameBase, nameSup] = unitName.split("^", 2);
  return (
    <small>
      {nameBase}
      {nameSup && <sup>{nameSup}</sup>}
    </small>
  );
};
