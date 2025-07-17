import { ChangeEvent, FormEvent, MouseEvent } from 'react';

export type ProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError: string;
};
