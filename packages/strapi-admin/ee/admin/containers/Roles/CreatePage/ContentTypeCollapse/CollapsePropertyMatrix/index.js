import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Padded } from '@buffetjs/core';
import generateHeadersFromActions from './utils/generateHeadersFromActions';
import Header from './Header';
import ActionRow from './ActionRow';
import Wrapper from './Wrapper';

const CollapsePropertyMatrix = ({
  availableActions,
  isLast,
  isOdd,
  label,

  name,
  propertyName,
  values,
}) => {
  const propertyActions = useMemo(
    () => generateHeadersFromActions(availableActions, propertyName),
    [availableActions, propertyName]
  );

  return (
    <Wrapper withPadding={isOdd} isLast={isLast}>
      <Header label={label} headers={propertyActions} />
      <Padded left size="md">
        {values.map(({ key, value, required }) => (
          <ActionRow
            key={key}
            rowName={key}
            value={value}
            required={required}
            propertyActions={propertyActions}
            propertyName={propertyName}
            pathToData={name}
          />
        ))}
      </Padded>
    </Wrapper>
  );
};

CollapsePropertyMatrix.propTypes = {
  availableActions: PropTypes.array.isRequired,
  isOdd: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  propertyName: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default CollapsePropertyMatrix;
