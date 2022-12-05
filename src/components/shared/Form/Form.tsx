import React, { FC } from 'react';

interface IForce {
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  handleSubmit: (e: React.FormEvent) => void;
  buttonText?: string;
  isBtnDisabled?: boolean
}

const Form: FC<IForce> = ({ value, handleInput, className, handleSubmit, buttonText, isBtnDisabled }) => {

  return (
    <form onSubmit={handleSubmit} className={`${className}__form`}>
      <input type="text" maxLength={10} className={`${className}__input`} value={value} onChange={handleInput} placeholder="add task..." />
      <button type="submit" className={`${className}__form-btn`} disabled={isBtnDisabled}>{buttonText || ""}</button>
    </form>)
}

export default Form;
