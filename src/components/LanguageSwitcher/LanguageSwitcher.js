import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, FormControl } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import './LanguageSwitcher.css';
import i18n from '../../i18n';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="language-switcher">
      <LanguageIcon className="language-icon" onClick={toggleDropdown} />
      {isDropdownOpen && (
        <FormControl variant="outlined" className="language-select">
          <Select
            value={i18n.language}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="en">
              <img src="/path/to/flags/en.png" alt="English" className="flag-icon" /> English
            </MenuItem>
            <MenuItem value="fr">
              <img src="/path/to/flags/fr.png" alt="French" className="flag-icon" /> Français
            </MenuItem>
            <MenuItem value="es">
              <img src="/path/to/flags/es.png" alt="Spanish" className="flag-icon" /> Español
            </MenuItem>
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default LanguageSwitcher;
