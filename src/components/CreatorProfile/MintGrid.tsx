import styled from "@emotion/styled";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 16px;
`;

const PoapCardImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: var(--border-radius);
`;

const PoapCardName = styled.div`
  font-family: "Montserrat Alternates";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  letter-spacing: 0.045em;
`;

const PoapCard = ({ poap }: any) => {
  return (
    <div>
      <PoapCardImage src={poap.image} />
      <PoapCardName>{poap.name}</PoapCardName>
    </div>
  );
};

type PoapGridProps = {
  poaps: any[];
};

const PoapGrid = ({ poaps }: PoapGridProps) => {
  return (
    <Grid>
      {poaps.map((poap) => (
        <PoapCard key={poap.id} poap={poap} />
      ))}
    </Grid>
  );
};

export default PoapGrid;
