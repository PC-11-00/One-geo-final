# InteractiveNote-taking Application in ReactJS

## Project Overview

This project aims to create an interactive note-taking application using JavaScript and ReactJS. The application allows users to create, edit, drag, and export notes within a designated Notes Area. Additionally, users can export their notes to a .xlsx file format.

## Features

### Notes Area with Text Box Implementation

1. **Notes Area Dimensions**: The Notes Area covers 3/4 of the window's width and 3/4 of the window's height.
2. **Double-Click Functionality**: Users can double-click within the Notes Area to create a blue box-like structure, which serves as an editable text box.
3. **Text Box Behavior**: Users can input text directly into the created text box.
4. **Dragging Text**: Text elements within the Notes Area can be dragged by users.
5. **Creating New Box**: Dropping text onto an empty space within the Notes Area generates a new blue box-like structure containing the dropped text.
6. **Appending to Existing Box**: Dropping text onto an existing blue box-like structure appends the dragged text to the existing content within that structure.

### Bonus Feature: Exporting Notes to .xlsx File

1. **Export Notes Button**: An "Export Notes" button is integrated into the application.
2. **Export Functionality**: Clicking the "Export Notes" button generates a .xlsx file containing the notes.
3. **Note Representation**: Each note occupies a separate row in the .xlsx file, maintaining the sequence in which they were created. For each text box, the note's text, its distance from the top and left edges of the window, and the distance from the top-left corner of the window are stored.

## Deployment

The application is deployed and accessible at [https://one-geo-final.onrender.com](https://one-geo-final.onrender.com).

## Technologies Used

- JavaScript
- ReactJS

## Usage

1. Access the deployed application at [https://one-geo-final.onrender.com](https://one-geo-final.onrender.com).
2. Double-click within the Notes Area to create a text box and input your text.
3. Drag text elements within the Notes Area to reposition them.
4. Drop text onto empty spaces to create new text boxes or onto existing boxes to append text.
5. Click the "Export Notes" button to export your notes to a .xlsx file.

## Development

To run the application locally:

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.

## Contributors

- Pushpendra

## License

This project is licensed under the [MIT License](LICENSE).