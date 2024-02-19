export const formStates = {
  failed: "request failed",
  success: "request successful",
  loading: "request processing",
  invalid: "invalid data",
  default: "default state"
};

export const formMessageColors = {
  red: "bg-red-500",
  orange: "bg-orange-300",
  green: "bg-green-300"
}

const formDispatch = (formState, setFormState, setPayload) => {
  let payload = {};
  switch (formState) {
    case formStates.failed:
      setFormState(formStates.failed);
      payload.bg_color = formMessageColors.red;
      setPayload(payload);
      break;
    case formStates.success:
      setFormState(formStates.success);
      payload.bg_color = formMessageColors.green;
      setPayload(payload);
      break;
    case formStates.loading:
      setFormState(formStates.loading);
      setPayload(null);
      break;
    case formStates.invalid:
      setFormState(formStates.invalid);
      payload.bg_color = formMessageColors.orange;
      setPayload(payload);
      break;
    case formStates.default:
      setFormState(formStates.default);
      setPayload(null)
    default:
      setPayload(null);
  }
};

export default formDispatch;

