import { format, addMonths, subMonths } from 'date-fns';
import React, { useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import '../App.css';

const Calendar = () => {
  const [notes, setNotes] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const sliderRef = useRef();

  const updateNotes = (date, noteKey, field, value) => {
    setNotes((prevNotes) => {
      const dateKey = format(date, 'dd-MM-yyyy');
      const existingNote = prevNotes[dateKey] || {};
      const updatedNote = {
        ...existingNote,
        [noteKey]: {
          ...existingNote[noteKey],
          [field]: value,
        },
      };

      return {
        ...prevNotes,
        [dateKey]: updatedNote,
      };
    });
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderCalendar = () => {
    const calendarGrid = [];
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      calendarGrid.push(
        <div
          key={i}
          className={`date-box ${selectedDate && selectedDate.getTime() === date.getTime() ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          <div className="date">{i}</div>
        </div>
      );
    }

    const monthName = format(currentMonth, 'MMMM yyyy');

    return (
      <div>
        <h2>{monthName}</h2>
        <div className="calendar">{calendarGrid}</div>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const nextMonth = () => {
    sliderRef.current.slickNext();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    sliderRef.current.slickPrev();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const addNote = () => {
    if (selectedDate) {
      setNotes((prevNotes) => {
        const dateKey = format(selectedDate, 'dd-MM-yyyy');
        const existingNote = prevNotes[dateKey] || {};
        const newNoteKey = `Trade${Object.keys(existingNote).length + 1}`;
        const newNote = {
          ...existingNote,
          [newNoteKey]: {
            "equity": "",
            "buyorsell": "",
            "stoploss": "",
            "closetrade": "",
            "safetraderprofit": "",
            "trailingtakeprofit": "",
            "loss": "",
          },
        };

        return {
          ...prevNotes,
          [dateKey]: newNote,
        };
      });
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Calendar with Notes</h1>
        <button onClick={prevMonth}>Previous Month</button>
        <button onClick={nextMonth}>Next Month</button>
        <Slider {...settings} ref={sliderRef}>
          {renderCalendar()}
        </Slider>
      </div>
      <div className="note-editor">
        {selectedDate && (
          <>
            <div>Date: {format(selectedDate, "dd-MM-yyyy")}</div>
            {Object.keys(notes[format(selectedDate, "dd-MM-yyyy")] || {}).map(
              (noteKey) => (
                <div className='c'>
                <div>
                  <div>{noteKey}</div>
                  <div className="inputfields" key={noteKey}>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="Equity"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "equity"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "equity",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="Buy/Sell"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "buyorsell"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "buyorsell",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="StopLoss"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "stoploss"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "stoploss",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="CloseTrade"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "closetrade"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "closetrade",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="SafeProfit"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "safetraderprofit"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "safetraderprofit",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="TrailProfit"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "trailingtakeprofit"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "trailingtakeprofit",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    <Box
                      sx={{
                        width: 400,
                        margin: '10px',
                        maxWidth: "25%",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                    >
                      <TextField 
                      label="Loss"
                      value={
                        notes[format(selectedDate, "dd-MM-yyyy")][noteKey][
                          "loss"
                        ] || ""
                      }
                      onChange={(e) =>
                        updateNotes(
                          selectedDate,
                          noteKey,
                          "loss",
                          e.target.value
                        )
                      }
                       />
                    </Box>
                    </div>
                  </div>
                </div>
              )
            )}
            <button onClick={addNote}>Add Trade</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;

// equityNote
// Buy/Sell
// StopLoss
// CloseTrade
// Safe Trader Profit
// Trailing Take-Profit
// Loss
