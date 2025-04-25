import { Dispatch, SetStateAction, useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { Button } from "@/ui/Button/";

interface ICalendarProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  type: "read" | "update";
}

export default function Calendar({ date, setDate, type }: ICalendarProps) {
  const createEachWeek = (currentYear: number, currentMonth: number) => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const weeks = [];
    let week = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const weeks = createEachWeek(currentYear, currentMonth);

  const changeMonth = (type: "next" | "prev") => {
    if (type === "next")
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    else if (type === "prev")
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    else return;
  };

  let monthName: string = "";

  switch (currentMonth) {
    case 0:
      monthName = "Janeiro";
      break;
    case 1:
      monthName = "Fevereiro";
      break;
    case 2:
      monthName = "Março";
      break;
    case 3:
      monthName = "Abril";
      break;
    case 4:
      monthName = "Maio";
      break;
    case 5:
      monthName = "Junho";
      break;
    case 6:
      monthName = "Julho";
      break;
    case 7:
      monthName = "Agosto";
      break;
    case 8:
      monthName = "Setembro";
      break;
    case 9:
      monthName = "Outubro";
      break;
    case 10:
      monthName = "Novembro";
      break;
    case 11:
      monthName = "Dezembro";
      break;
  }

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const getTitle = (day: number, month: number, year: number) => {
    if (
      day === new Date().getDate() &&
      month === new Date().getMonth() + 1 &&
      year === new Date().getFullYear()
    )
      return "Hoje";
    else if (
      day === date?.getDate() &&
      month === date?.getMonth() + 1 &&
      year === date?.getFullYear() &&
      type !== "read"
    )
      return "Data para Completar";
    else if (
      day === date?.getDate() &&
      month === date?.getMonth() + 1 &&
      year === date?.getFullYear() &&
      type === "read"
    )
      return "Data de Criação";
    else return "";
  };

  return (
    <section
      className="w-full max-w-[425px] p-1 border rounded-lg border-woodsmoke-400 dark:border-woodsmoke-800
    md:max-w-1/2"
    >
      <h3 className="text-center text-woodsmoke-950/50 dark:text-woodsmoke-100/50">
        Calendário {type === "read" ? "Data Criação" : "Data de Prazo"}
      </h3>
      <div className="flex justify-between">
        {type === "update" && (
          <Button
            extraStyles={{ button: "border-none" }}
            action={() => changeMonth("prev")}
            ariaLabel="Próxima Página"
            icon={<IoMdArrowDropleftCircle />}
          />
        )}
        <h3 className="w-full text-lg text-center">
          {currentYear} - {monthName}
        </h3>
        {type === "update" && (
          <Button
            extraStyles={{ button: "border-none" }}
            action={() => changeMonth("next")}
            ariaLabel="Próxima Página"
            icon={<IoMdArrowDroprightCircle />}
          />
        )}
      </div>

      <table className="w-full rounded-lg bg-woodsmoke-100 ease-in-out duration-300 dark:bg-woodsmoke-925">
        <thead className="">
          <tr className="grid grid-cols-7 p-2">
            {daysOfWeek.map((date) => {
              return <th key={date}>{date}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index} className="grid grid-cols-7 gap-2 m-2 px-2">
              {week.map((day, index) => (
                <td
                  title={
                    date && day && month && year
                      ? getTitle(day, month, year)
                      : ""
                  }
                  key={index}
                  onClick={() => {
                    if (typeof day !== "number") return;
                    setDate(new Date(year, month - 1, day ?? 0));
                  }}
                  className={`p-1 text-center duration-300 ease-in-out border border-transparent font-medium
                    lg:p-2
                    ${type === "read" && "cursor-default"}
                    ${
                      typeof day === "number" &&
                      `rounded-md border border-woodsmoke-800 cursor-pointer 
                      ${type !== "read" && "hover:bg-woodsmoke-200 dark:hover:bg-woodsmoke-900 dark:hover:shadow-md dark:hover:shadow-woodsmoke-100/25"}`
                    }
                    ${day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear() && "bg-[#e5e54e] dark:bg-woodsmoke-600"}
                    ${day === date?.getDate() && month === date?.getMonth() + 1 && year === date?.getFullYear() && type !== "read" && "bg-poppy-500 text-woodsmoke-950 dark:bg-woodsmoke-200"}
                    ${day === date?.getDate() && month === date?.getMonth() + 1 && year === date?.getFullYear() && type !== "update" && "bg-apple-500 text-woodsmoke-950 dark:bg-woodsmoke-200"}
                  `}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {date ? (
        <p className="text-center">{`${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`}</p>
      ) : (
        <p className="text-center text-woodsmoke-950/50 dark:text-woodsmoke-100/50">
          Prazo Indefinido...
        </p>
      )}
    </section>
  );
}
