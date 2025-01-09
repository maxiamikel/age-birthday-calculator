import { useState } from "react";
import "./App.css";

const App = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert("Invalid date detected.");
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    if (birth > today) {
      alert("The birth date cannot be greather than today");
      return;
    }

    const age = today.getFullYear() - birth.getFullYear();
    const hasHadBirthdayThisYear =
      today.getMonth() > birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() >= birth.getDate());

    const currentAge = hasHadBirthdayThisYear ? age : age - 1;

    let nextBirthday = new Date(
      today.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    if (!hasHadBirthdayThisYear) {
      nextBirthday.setFullYear(today.getFullYear());
    } else {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDiff = nextBirthday - today;
    const daysToNextBirthday = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30);
    const remainingDays = daysToNextBirthday % 30;

    setResult({
      age: currentAge,
      monthsToNextBirthday,
      remainingDays,
    });
  };
  return (
    <div className="container">
      <div className="calculator">
        <h1>Age calculator</h1>
        <div className="input-box">
          <input
            type="date"
            id="date"
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
            value={birthDate}
          />
          <button type="button" onClick={calculateAge}>
            Calculate
          </button>
        </div>

        {result && (
          <div className="result">
            <p>
              Your current age: {result.age}{" "}
              {result.age > 1 ? "years old" : "year old"}
            </p>
            <p>
              {result.monthsToNextBirthday}{" "}
              {result.monthsToNextBirthday > 1 ? "months" : "month"} and{" "}
              {result.remainingDays} {result.remainingDays > 1 ? "days" : "day"}{" "}
              left until your next birthday and will complish {result.age + 1}{" "}
              year old .
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
