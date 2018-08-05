import React from 'react';
import { Container, Image } from 'semantic-ui-react';


export default props => {
  const { picaName, picaAge, parter1, partner2, picaHabbit } = props;
  
  return (
    <div className="pica-container">
        <Image className="pica-image-l1" src='../../static/magpie_l1.svg' />
        <div className="pica-name">Pica</div>
        <div className="pica-description">
            Age: 1 <br />
            Owner: Mark and Jessica <br />
            Habbit: Eat and discover gems <br />
        </div>
    </div>
  );
};
