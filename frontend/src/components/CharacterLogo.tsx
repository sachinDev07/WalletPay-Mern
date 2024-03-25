import classNames from "classnames";

type CharacterLogoProps = {
  character: string;
  width: string;
  height: string;
  bgColor: string;
  textColor: string;
  textSize: string;
};

const CharacterLogo = ({
  character,
  width,
  height,
  bgColor,
  textColor,
  textSize,
}: CharacterLogoProps) => {
  const classStr = classNames(
    "rounded-full flex justify-center",
    width,
    height,
    bgColor,
    textColor,
    textSize,
  );
  return (
    <div className={classStr}>
      <div className={`flex flex-col items-center justify-center h-full font-bold`}>
        {character.toUpperCase()}
      </div>
    </div>
  );
};

export default CharacterLogo;
