/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Text } from '@buffetjs/core';
import Tooltip from '../../../../admin/src/components/Tooltip';
import { ProviderButtonWrapper, ProviderLink } from './ProviderButtonStyles';

const ProviderButton = ({ provider }) => {
  const handleProviderClick = async () => {
    const { data } = await axios({
      url: `${strapi.backendURL}/admin/connect/${provider.uid}`,
      method: 'POST',
    });

    console.log(data);
  };

  return (
    <>
      <ProviderLink
        onClick={handleProviderClick}
        // href={`${strapi.backendURL}/admin/connect/${provider.uid}`}
        data-for={provider.uid}
        data-tip={provider.displayName}
      >
        <ProviderButtonWrapper justifyContent="center" alignItems="center">
          {provider.icon ? (
            <img
              src={provider.icon}
              alt={provider.displayName}
              style={{ maxWidth: 80, maxHeight: 40 }}
            />
          ) : (
            <Text fontSize="xs" ellipsis>
              {provider.displayName}
            </Text>
          )}
        </ProviderButtonWrapper>
      </ProviderLink>
      <Tooltip id={provider.uid} />
    </>
  );
};

ProviderButton.propTypes = {
  provider: PropTypes.shape({
    displayName: PropTypes.string,
    icon: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default ProviderButton;
