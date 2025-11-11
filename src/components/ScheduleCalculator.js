import React, { useState } from "react";

function calculateSchedule(startDate, totalClasses, classWeekdays, holidays, holidayRanges) {
  const schedule = [];
  const conflicts = [];

  const expandedHolidays = new Set();
  holidayRanges.forEach(([startH, endH]) => {
    let current = new Date(startH);
    const end = new Date(endH);
    while (current <= end) {
      expandedHolidays.add(current.toDateString());
      current.setDate(current.getDate() + 1);
    }
  });

  let current = new Date(startDate);
  while (schedule.length < totalClasses) {
    const jsWeekday = current.getDay() === 0 ? 6 : current.getDay() - 1; // 0=Monday, ..., 6=Sunday
    if (classWeekdays.includes(jsWeekday)) {
      const md = [current.getMonth() + 1, current.getDate()];
      const isHoliday =
        holidays.some(([m, d]) => m === md[0] && d === md[1]) ||
        expandedHolidays.has(current.toDateString());

      if (!isHoliday) {
        schedule.push(new Date(current));
      } else {
        conflicts.push(new Date(current));
      }
    }
    current.setDate(current.getDate() + 1);
  }

  return {
    endDate: schedule[schedule.length - 1].toISOString().split("T")[0],
    fullSchedule: schedule.map((d) => d.toISOString().split("T")[0]),
    conflicts: conflicts.map((d) => d.toISOString().split("T")[0]),
  };
}

export default function ScheduleCalculator() {
  const [startDate, setStartDate] = useState("");
  const [totalClasses, setTotalClasses] = useState(10);
  const [weekdays, setWeekdays] = useState("1 3"); 
  const [holidayStart, setHolidayStart] = useState("");
  const [holidayEnd, setHolidayEnd] = useState("");
  const [result, setResult] = useState(null);

  const holidays = [
    [1, 1],
    [2, 3],
    [4, 30],
    [5, 1],
    [9, 2],
  ];

  const handleCompute = () => {
    const classWeekdays = weekdays.split(" ").map((x) => parseInt(x));
    const holidayRanges = holidayStart && holidayEnd ? [[holidayStart, holidayEnd]] : [];
    const res = calculateSchedule(startDate, totalClasses, classWeekdays, holidays, holidayRanges);
    setResult(res);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0 15px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
  const sectionStyle = { marginBottom: "20px" };
  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Lập Lịch Học Tự Động</h2>

      <div style={sectionStyle}>
        <label style={labelStyle}>Ngày bắt đầu:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Tổng số buổi học:</label>
        <input
          type="number"
          value={totalClasses}
          onChange={(e) => setTotalClasses(e.target.value)}
          style={inputStyle}
          placeholder="Ví dụ: 10"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Ngày học trong tuần (0=Thứ 2 ... 6=Chủ nhật):</label>
        <input
          type="text"
          value={weekdays}
          onChange={(e) => setWeekdays(e.target.value)}
          style={inputStyle}
          placeholder="Ví dụ: 1 3"
        />
      </div>

      <div style={sectionStyle}>
        <label style={labelStyle}>Kỳ nghỉ dài hạn (tùy chọn):</label>
        <input
          type="date"
          value={holidayStart}
          onChange={(e) => setHolidayStart(e.target.value)}
          style={inputStyle}
          placeholder="Ngày bắt đầu nghỉ"
        />
        <input
          type="date"
          value={holidayEnd}
          onChange={(e) => setHolidayEnd(e.target.value)}
          style={inputStyle}
          placeholder="Ngày kết thúc nghỉ"
        />
      </div>

      <button onClick={handleCompute} style={buttonStyle}>
        Tính lịch học
      </button>

      {result && (
        <div style={{ marginTop: "30px" }}>
          <h3>Ngày bế giảng: {result.endDate}</h3>

          <h4>Lịch học hợp lệ:</h4>
          <ul>
            {result.fullSchedule.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          {result.conflicts.length > 0 && (
            <>
              <h4>Ngày trùng nghỉ:</h4>
              <ul style={{ color: "red" }}>
                {result.conflicts.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
