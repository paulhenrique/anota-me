import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { ReactComponent as Note } from "./assets/note.svg";
import { useEffect, useState } from "react";

const CurrentNotesList = ({
  currentNotes,
  handleDelete,
}: {
  currentNotes: string[];
  handleDelete: (index: number) => void;
}) => {
  // monta na tela utilizando o componente list do material ui v5
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" color="primary">
        Minhas anotações
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <List sx={{ width: "100%" }}>
          {currentNotes.map((note, index) => (
            <ListItem
              key={index}
              onClick={() => handleDelete(index)}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Delete />
                </IconButton>
              }
              sx={{ width: "100%" }}
            >
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

const App = () => {
  const [currentText, setCurrentText] = useState("");

  const cleanCurrentText = () => {
    setCurrentText("");
  };

  const saveCurrentTextNotesArrayInLocalStorage = () => {
    const currentTextNotesArray = JSON.parse(
      localStorage.getItem("currentTextNotesArray") || "[]"
    );
    currentTextNotesArray.push(currentText);
    localStorage.setItem(
      "currentTextNotesArray",
      JSON.stringify(currentTextNotesArray)
    );

    setCurrentNotes((curr) => [...curr, currentText]);
    cleanCurrentText();
  };

  const [currentNotes, setCurrentNotes] = useState([] as string[]);

  const getCurrentNotesFromLocalStorage = () => {
    const currentNotes = JSON.parse(
      localStorage.getItem("currentTextNotesArray") || "[]"
    );
    setCurrentNotes(currentNotes);
  };

  // dispara busca do getCurrent Notes quando o componente é montado
  useEffect(() => {
    getCurrentNotesFromLocalStorage();
  }, []);

  const handleDelete = (index: number) => {
    const currentNotes = JSON.parse(
      localStorage.getItem("currentTextNotesArray") || "[]"
    );
    currentNotes.splice(index, 1);
    localStorage.setItem("currentTextNotesArray", JSON.stringify(currentNotes));
    setCurrentNotes(currentNotes);
  };

  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: 2,
          gap: 2,
        }}
      >
        <Note height={300} width="100%" />
        <Typography color="primary" variant="h6">
          Anota-me
        </Typography>
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <TextField
            multiline
            variant="standard"
            maxRows={7}
            value={currentText}
            onChange={({ target: { value } }) => {
              if (value.length > 1000) return;
              setCurrentText(value);
            }}
            error={currentText?.length > 1000}
            helperText={
              currentText?.length > 1000 ? "Máximo de 1000 caracteres" : ""
            }
            label="Mensagem"
            fullWidth
          />
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="primary"
            fullWidth
            onClick={saveCurrentTextNotesArrayInLocalStorage}
          >
            Salvar
          </Button>
          <Button
            variant="contained"
            size="large"
            disableElevation
            color="secondary"
            fullWidth
          >
            Minhas anotações
          </Button>
        </Box>
        <CurrentNotesList
          handleDelete={handleDelete}
          currentNotes={currentNotes}
        />
      </Container>
    </>
  );
};

export default App;
