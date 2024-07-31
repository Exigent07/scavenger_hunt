import './Input.css';

function Input({ type, placeholder, value, onChange }) {
    const handlePhoneInputChange = (e) => {
        let currentValue = e.target.value;
        let inputValue = currentValue.replace(/\D/g, '');

        if (inputValue.startsWith('91')) {
            inputValue = inputValue.slice(2);
        } else if (inputValue.startsWith('+91')) {
            inputValue = inputValue.slice(3);
        }

        if (inputValue.length === 0) {
            onChange({ target: { value: "" } });
            return;
        }

        if (inputValue.length <= 10) {
            let formattedValue = '+91 ';
            for (let i = 0; i < inputValue.length; i++) {
                if (i === 5) {
                    formattedValue += ' ';
                }
                formattedValue += inputValue[i];
            }

            onChange({ target: { value: formattedValue } });
        }
    };

    const renderInputField = () => {
        switch (type) {
            case 'teamName':
                return (
                    <div className="teamName">
                        <img className="teamNamePerson" src="/images/team.svg" alt="Person" />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                            required
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            case 'memberName':
                return (
                    <div className="memberName">
                        <img className="memberNamePerson" src="/images/person.svg" alt="Person" />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            case 'email':
                return (
                    <div className="email">
                        <img className="emailSvg" src="/images/email.svg" alt="Email" />
                        <input
                            type="email"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                            required
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            case 'password':
                return (
                    <div className="password">
                        <img className="passwordSvg" src="/images/password.svg" alt="Password" />
                        <input
                            type="password"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                            required
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            case 'phone':
                return (
                    <div className="phone">
                        <img className="phoneSvg" src="/images/phone.svg" alt="Phone" />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={handlePhoneInputChange}
                            required
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            case 'flag':
                return (
                    <div className="flag">
                        <img className="flagSvg" src="/images/flag.svg" alt="Flag" />
                        <input
                            type="text"
                            placeholder=" "
                            autoComplete="off"
                            value={value}
                            onChange={onChange}
                            required
                        />
                        <div className={`customPlaceholder ${value ? 'active' : ''}`}>{placeholder}</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="Input">
            {renderInputField()}
        </div>
    );
}

export default Input;
