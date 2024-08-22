import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import LanguageIcon from '@mui/icons-material/Language';
import './LanguageSwitcher.css';
import i18n from '../../i18n';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (language) => {
    i18n.changeLanguage(language);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="language-switcher">
      <LanguageIcon className="language-icon" onClick={toggleDropdown} />
      {isDropdownOpen && (
        <Dropdown.Menu show className="language-select">
          <Dropdown.Item onClick={() => handleChange('en')} style={{display : "flex"}}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAFVBMVEX////OESTMAAPtvb/uwcPNABXhjZHwlm9FAAABiUlEQVR4nO3asQ3DMBAEQVqk1H/JdgcTPgTvVHDY+Naata8PXHt44rQSUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRFQiKhGViEpEJaISUYmoRHSc6Exv3KPOcyvR/ZzZjeuaxUK/RsMTlyf+uxJRiahEVCIqEZWISkQlohJRiahEVCIqEZWISkQlohJRiahEVCIqEZWISkQlohJRiahEVCIqEZWISkRdsKgjH01fLd9wBx3WqZhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiElGJqERUIioRlYhKRCWiFyT6AlXQRZ39U6PdAAAAAElFTkSuQmCC" alt="English" className="flag-icon" /> <p style={{color : "black"}}>English</p>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleChange('fr')} style={{display : "flex"}}>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png" alt="French" className="flag-icon" /><p style={{color : "black"}}>Français</p> 
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleChange('es')} style={{display : "flex"}} >
            <img src="data:image/png;base64,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" alt="Spanish" className="flag-icon" /> <p style={{color : "black"}}>Español</p>
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default LanguageSwitcher;
