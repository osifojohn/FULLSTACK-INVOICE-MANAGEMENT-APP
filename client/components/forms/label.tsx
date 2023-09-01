import React from 'react';

interface labelProps {
  labelFor: string;
  labelText: string;
}

const Label = ({ labelFor, labelText }: labelProps) => {
  return (
    <label htmlFor={labelFor} className="sr-only">
      {labelText}
    </label>
  );
};

export default Label;
