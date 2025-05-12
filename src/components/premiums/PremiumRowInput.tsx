import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { debounce } from '../../utils/currency';
import { TextField } from '../../ui/components/TextField';
import { parseCurrency, formatCurrency } from '../../utils/currency';

interface PremiumRowInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PremiumRowInput: React.FC<PremiumRowInputProps> = ({ value, onChange }) => {
  const [display, setDisplay] = useState<string>(formatCurrency(value));
  const prevValueRef = useRef<number>(value);

  // Update display when external value changes
  useEffect(() => {
    if (value !== prevValueRef.current) {
      setDisplay(formatCurrency(value));
      prevValueRef.current = value;
    }
  }, [value]);

  // Debounced onChange
  const debouncedChange = useRef(debounce((val: number) => onChange(val), 300));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplay(raw);
    const parsed = parseCurrency(raw);
    if (parsed >= 0) debouncedChange.current(parsed);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Copy-down: Cmd/Ctrl + D
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
      e.preventDefault();
      // TODO: implement copy-down at table level
    }
  };

  return (
    <TextField className="w-full">
      <TextField.Input
        className="text-right"
        value={display}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="$0.00"
      />
    </TextField>
  );
};

export default PremiumRowInput; 