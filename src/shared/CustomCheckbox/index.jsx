import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { COLORS } from '../../utils/colors';

const StyledCheckbox = styled(Checkbox)(() => ({
  color: COLORS.gray,
  '&.Mui-checked': {
    color: COLORS.pink,
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const CustomCheckbox = ({ label, checked, onChange, name, ...props }) => {
  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          checked={checked}
          onChange={onChange}
          name={name}
          icon={<CheckBoxOutlineBlankIcon fontSize="medium" />}
          checkedIcon={<CheckBoxIcon fontSize="medium" />}
          {...props}
        />
      }
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          color: COLORS.gray,
          '&:hover': {
            color: COLORS.pink
          }
        }
      }}
    />
  );
};

export default CustomCheckbox;
