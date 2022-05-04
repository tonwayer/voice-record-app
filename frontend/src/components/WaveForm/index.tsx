import LinearProgress from "@mui/material/LinearProgress";

type Props = {
  value: number;
};

const WaveForm = (props: Props) => {
  return <LinearProgress variant="determinate" value={Math.min(100, (Math.abs(props.value) / 441) * 100)} />;
};

export default WaveForm;
