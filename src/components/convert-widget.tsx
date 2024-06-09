import { type ChangeEvent, useRef, useState, type FC } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { RotateCcw } from "lucide-react";

export interface ConvertWidgetProps {
  unitAName: string;
  unitBName: string;
  defaultA: number;
  convertAtoB: (v: number) => number;
  convertBtoA: (v: number) => number;
}

export const ConvertWidget: FC<ConvertWidgetProps> = ({
  unitAName,
  unitBName,
  defaultA,
  convertAtoB,
  convertBtoA,
}) => {
  const defaultB = convertAtoB(defaultA);
  const [unitAValue, setUnitAValue] = useState(defaultA);
  const [unitBValue, setUnitBValue] = useState(defaultB);
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
    setUnitAValue(defaultA);
    setUnitBValue(defaultB);
    unitARef.current?.focus();
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const onFlipClick = () => setIsFlipped((prev) => !prev);

  const [leftUnitName, rightUnitName] = isFlipped ? [unitBName, unitAName] : [unitAName, unitBName];
  const [leftUnitValue, rightUnitValue] = isFlipped
    ? [unitBValue, unitAValue]
    : [unitAValue, unitBValue];
  const [handleLeftUnitChange, handleRightUnitChange] = isFlipped
    ? [handleUnitBChange, handleUnitAChange]
    : [handleUnitAChange, handleUnitBChange];

  return (
    <>
      <UnitInput
        unitName={leftUnitName}
        unitValue={leftUnitValue}
        onUnitChange={handleLeftUnitChange}
      />
      <small
        className="justify-self-center md:justify-self-start font-light cursor-pointer select-none"
        onClick={onFlipClick}
      >
        =
      </small>
      <UnitInput
        unitName={rightUnitName}
        unitValue={rightUnitValue}
        onUnitChange={handleRightUnitChange}
      />
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

interface UnitInputProps {
  unitName: string;
  unitValue: number;
  onUnitChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const UnitInput: FC<UnitInputProps> = ({ unitName, unitValue, onUnitChange }) => (
  <div className="flex items-center gap-2">
    <Input
      type="number"
      placeholder={unitName}
      value={unitValue}
      onChange={onUnitChange}
      className="w-24 font-mono"
    />
    <UnitDisplay unitName={unitName} />
  </div>
);
