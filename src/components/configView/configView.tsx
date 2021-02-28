import { useContext } from "react"
import ConfigContext from "../configContext"

const ConfigView = ({onConfigChanged}:any) => {

  const config = useContext(ConfigContext);

  const handleIsActiveMusicCheckbox = () => {
    const newConfig = {...config, isActiveMusic: !config.isActiveMusic};
    onConfigChanged(newConfig);
  }
  return (
    <div>
      <input id='isActiveMusic' type='checkbox' checked={config.isActiveMusic} onChange={handleIsActiveMusicCheckbox}/>
    </div>
  )
}

export default ConfigView;