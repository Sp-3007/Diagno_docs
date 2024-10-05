import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = () => {
  const [phone, setPhone] = useState('');

  return (
    <div>
      <PhoneInput
        country={'us'}
        value={phone}
        onChange={setPhone}
      />
      <p>Phone Number: {phone}</p>
    </div>
  );
};

export default PhoneNumberInput;
