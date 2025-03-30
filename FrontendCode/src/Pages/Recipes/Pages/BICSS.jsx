
// MultipleSelectCheckmarks.js
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const names = [
  'Chicken Dishes',
  'Fish Dishes',
  'Veg Dishes',
  'Snacks',
  'Drinks',
  'Fruits',
  'Ice Cream',
  'Others',
];

export default function MultipleSelectCheckmarks({ onSelectChange }) {
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleChange = (event) => {
    setSelectedOptions(event.target.value);
    // Call the onSelectChange function passed from the parent with the selected options
    onSelectChange(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ mb: 2, width: 430 }}>
        <InputLabel id="demo-multiple-checkbox-label">Select</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={selectedOptions.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}