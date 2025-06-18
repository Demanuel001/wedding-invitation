import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string; // Format: "DD/MM/YY"
  targetTime?: string; // Format: "HH:MM"
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  targetTime = "16:00"
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const [day, month, year] = targetDate.split('/');
      const fullYear = year.length === 2 ? `20${year}` : year;
      const [targetHours, targetMinutes] = targetTime.split(':');

      const target = new Date(
        parseInt(fullYear),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(targetHours),
        parseInt(targetMinutes)
      );

      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <div className="bg-gradient-to-r from-amber-100 to-blue-100 rounded-lg p-4 shadow-sm">
          <p className="text-blue-800 font-medium">
            O grande dia chegou! ✨
          </p>
        </div>
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: 'Dias', key: 'days' },
    { value: timeLeft.hours, label: 'Horas', key: 'hours' },
    { value: timeLeft.minutes, label: 'Minutos', key: 'minutes' },
    { value: timeLeft.seconds, label: 'Segundos', key: 'seconds' }
  ];

  return (
    <div className="flex justify-center gap-2 py-4 px-2 sm:px-0 overflow-x-auto">
      {timeUnits.map((unit) => (
        <div
          key={unit.key}
          className="flex-shrink-0 w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-white/70 backdrop-blur-sm rounded-lg shadow-sm text-center border border-blue-100 flex flex-col justify-center items-center"
        >
          <div className="text-base xs:text-lg sm:text-xl font-semibold text-blue-800">
            {unit.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[9px] xs:text-[10px] sm:text-xs text-blue-600 font-medium mt-1">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
