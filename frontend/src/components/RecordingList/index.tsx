import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

type Props = {
  recordings: Array<string>;
  selectedFile: string,
  handleSelectFile: Function,
};

export default function SelectedListItem(props: Props) {

  return (
    <List component="nav" aria-label="main mailbox folders">
      {props.recordings.map((record) => (
        <ListItemButton
          key={record}
          selected={props.selectedFile === record}
          onClick={(event) => props.handleSelectFile(record)}
        >
          <ListItemText primary={record} />
        </ListItemButton>
      ))}
    </List>
  );
}
