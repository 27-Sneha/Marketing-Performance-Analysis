import React, { useRef } from "react";
import Button from "@mui/material/Button";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { hover } from "@testing-library/user-event/dist/hover";

const DateRangeButtonField = React.forwardRef((props, ref) => {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref: containerRef } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  // Using useRef to manage the button ref
  const buttonRef = useRef(null);

  // Combine buttonRef and forwarded ref
  React.useEffect(() => {
    if (ref) {
      ref.current = buttonRef.current;
    }
  }, [ref]);

  return (
    <Button
      variant="text"
      id={id}
      disabled={disabled}
      ref={buttonRef}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
      sx={{ border: "none", hover: { outline: "none" } }}
    >
      {label}
    </Button>
  );
});

DateRangeButtonField.fieldType = "single-input";

const ButtonDateRangePicker = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DateRangePicker
      slots={{ field: DateRangeButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      ref={ref}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
});

export default ButtonDateRangePicker;
