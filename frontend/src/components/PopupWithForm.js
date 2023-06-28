import React from "react";
import Popup from "./Popup";
import Form from "./Form";

export default function PopupWithForm({
  name,
  title,
  saveText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <Form title={title} name={name} saveText={saveText} onSubmit={onSubmit}>
        {children}
      </Form>
    </Popup>
  );
}
