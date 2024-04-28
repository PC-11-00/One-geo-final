import React, { useRef, useState } from 'react';
import Box from './Box';
import './NotesArea.css';
import TextBox from './TextBox';
import * as XLSX from 'xlsx';

const doBoxesOverlap = (box1X, box1Y, box2X, box2Y, boxWidth, boxHeight) => {
    const box1RightX = box1X + boxWidth;
    const box1BottomY = box1Y + boxHeight;
    const box2RightX = box2X + boxWidth;
    const box2BottomY = box2Y + boxHeight;

    if (box1X > box2RightX || box2X > box1RightX || box1Y > box2BottomY || box2Y > box1BottomY) {
        // Boxes do not overlap
        return false;
    } else {
        // Boxes overlap
        return true;
    }
}

const NotesArea = () => {
    const [boxes, setBoxes] = useState([]);
    const [texts, setTexts] = useState([]);
    const notesAreaRef = useRef(null);

    const handleDoubleClick = (event) => {
        if (notesAreaRef.current) {
            const rect = notesAreaRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const boxId = Date.now();
            const text = { id: 2 * Date.now(), x, y, value: "", boxId };
            setTexts([...texts, text]);
            setBoxes([...boxes, { id: boxId, x, y }]);
        }
    };

    const handleTextChange = (textId, newValue) => {
        const updatedTexts = texts.map(text => {
            if (text.id === textId) {
                return { ...text, value: newValue };
            }
            return text;
        });
        setTexts(updatedTexts);
    };

    const generateNewText = (oldBoxId, oldX, oldY) => {
        const newText = { id: 2 * Date.now(), x: oldX, y: oldY, value: "", boxId: oldBoxId };
        setTexts(prevTexts => [...prevTexts, newText]);
    }

    const generateNewBox = (newBoxId, newPosition, updatedText) => {
        setBoxes([...boxes, { id: newBoxId, x: newPosition.x, y: newPosition.y }]);
    }

    const appendToOldOrGenerateNewBox = (newPosition, newBoxId, updatedText) => {
        var destinationBoxId = -1;
        const { x, y } = newPosition;
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i];
            const ele = document.getElementById(`box-${box.id}`);
            const rect = ele.getBoundingClientRect();
            if (doBoxesOverlap(box.x, box.y, x, y, rect.width, rect.height)) {
                destinationBoxId = box.id;
                break; // Exit the loop once a destination box is found
            }
        }

        if (destinationBoxId == -1) {
            generateNewBox(newBoxId, newPosition, updatedText);
        } else {
            console.log("Going to append");
            var deletedTextId;
            const updatedTexts = texts.map(text => {
                if (text.boxId === destinationBoxId) {
                    var prevText = text.value;
                    deletedTextId = updatedText.id;
                    return { ...text, value: prevText + updatedText.value };
                }
                return text;
            });
            const updatedSecondTexts = updatedTexts.filter(text => text.id !== deletedTextId);
            setTexts(updatedSecondTexts);
        }
    }

    const hasMoved = (textId, newPosition) => {
        for (var i = 0; i < texts.length; i++) {
            if (texts[i].id === textId && newPosition.x === texts[i].x && newPosition.y === texts[i].y) {
                return false;
            }
        }
        return true;
    }

    const handleStopText = (textId, newPosition) => {
        if (!hasMoved(textId, newPosition)) {
            return;
        }

        var newBoxId, updatedText, foundText;
        const updatedTexts = texts.map(text => {
            if (text.id === textId) {
                foundText = text;
                newBoxId = Date.now();
                updatedText = { ...text, x: newPosition.x, y: newPosition.y, boxId: newBoxId };

                return updatedText;
            }
            return text;
        });
        setTexts(updatedTexts);

        appendToOldOrGenerateNewBox(newPosition, newBoxId, updatedText);
        generateNewText(foundText.boxId, foundText.x, foundText.y);
    };

    // Function to export notes to .xlsx file
    const exportNotes = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(texts.map(({ id, value, x, y }) => ({ 'ID': id, 'Note Text': value, 'Distance from top': y, 'Distance from left': x, 'Distance from top-left corner': Math.sqrt(x * x + y * y) })));
        XLSX.utils.book_append_sheet(wb, ws, 'Notes');
        XLSX.writeFile(wb, 'notes.xlsx');
    };

    return (
        <div >
            <div
                className="notes-area"
                onDoubleClick={handleDoubleClick}
                ref={notesAreaRef}
            >
                {boxes.map((box) => (
                    <Box
                        key={box.id}
                        id={box.id}
                        x={box.x}
                        y={box.y}
                    />
                ))}
                {texts.map((text) => (
                    <TextBox
                        key={text.id}
                        id={text.id}
                        x={text.x}
                        y={text.y}
                        value={text.value}
                        onChange={(e) => handleTextChange(text.id, e.target.value)}
                        onStop={(e, data) => handleStopText(text.id, { x: data.x, y: data.y })}
                    />
                ))}
            </div>
            <div className='btn-wrapper'>
                <button onClick={exportNotes} className="export-button" >Export Notes</button>
            </div>
        </div >
    );
};

export default NotesArea;
