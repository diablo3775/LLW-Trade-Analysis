import React from 'react';

const NoteInputField = ({ placeholder, value, onChange }) => (
  <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
);

const generateInputFields = (fields, date, noteKey, updateNotes) => {
  return fields.map((field) => (
    <NoteInputField
      key={field.key}
      placeholder={field.placeholder}
      value={notes[format(date, 'dd-MM-yyyy')][noteKey][field.key] || ""}
      onChange={(e) => updateNotes(date, noteKey, field.key, e.target.value)}
    />
  ));
};

const Calendar = () => {
  // ... (your existing code)

  const inputFieldsConfig = [
    { key: "equity", placeholder: "EquityName" },
    { key: "buyorsell", placeholder: "Buy/Sell" },
    { key: "stoploss", placeholder: "StopLoss" },
    // Add more fields as needed
  ];

  return (
    <div>
      {/* ... (your existing code) */}
      <div className="note-editor">
        <h3>Add/Update Note</h3>
        {selectedDate && (
          <>
            <div>Date: {format(selectedDate, 'dd-MM-yyyy')}</div>
            {Object.keys(notes[format(selectedDate, 'dd-MM-yyyy')] || {}).map((noteKey) => (
              <div className='inputfields' key={noteKey}>
                {generateInputFields(inputFieldsConfig, selectedDate, noteKey, updateNotes)}
              </div>
            ))}
            <button onClick={addNote}>Add Note</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
