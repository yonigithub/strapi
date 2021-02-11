import React, { memo, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Padded, Flex } from '@buffetjs/core';
import { get } from 'lodash';
import CheckboxWithCondition from '../../../CheckboxWithCondition';
import { usePermissionsDataManager } from '../../../contexts/PermissionsDataManagerContext';
import Chevron from '../../../Chevron';
import HiddenAction from '../../../HiddenAction';
import RequiredSign from '../../../RequiredSign';
import RowLabel from '../../../RowLabel';
import SubActionRow from '../SubActionRow';
import Wrapper from './Wrapper';

const ActionRow = ({ rowName, value, required, propertyActions, pathToData, propertyName }) => {
  const { modifiedData, onChangeSimpleCheckbox } = usePermissionsDataManager();
  const [rowToOpen, setRowToOpen] = useState(null);

  const isActive = rowToOpen === rowName;

  const recursiveValues = useMemo(() => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value;
  }, [value]);

  const isCollapsable = recursiveValues.length > 0;

  const handleClick = useCallback(() => {
    if (isCollapsable) {
      setRowToOpen(prev => {
        if (prev === rowName) {
          return null;
        }

        return rowName;
      });
    }
  }, [isCollapsable, rowName]);

  // const subRowName = [...pathToData.split('..'), actionId, propertyName, ]

  return (
    <>
      <Wrapper alignItems="center" isCollapsable={isCollapsable}>
        <Flex style={{ flex: 1 }}>
          <Padded left size="sm" />
          <RowLabel
            width="15rem"
            onClick={handleClick}
            isCollapsable={isCollapsable}
            label={rowName}
            // TODO
            textColor="grey"
          >
            {required && <RequiredSign />}
            <Chevron icon={isActive ? 'caret-up' : 'caret-down'} />
          </RowLabel>
          <Flex style={{ flex: 1 }}>
            {propertyActions.map(({ actionId, label, isActionRelatedToCurrentProperty }) => {
              if (!isActionRelatedToCurrentProperty) {
                return <HiddenAction key={label} />;
              }

              const hasChildForm = Array.isArray(value);

              if (!hasChildForm) {
                const checkboxName = [...pathToData.split('..'), actionId, propertyName, value];

                const checkBoxValue = get(modifiedData, checkboxName, false);

                return (
                  <CheckboxWithCondition
                    key={label}
                    name={checkboxName.join('..')}
                    onChange={onChangeSimpleCheckbox}
                    value={checkBoxValue}
                  />
                );
              }
              // TODO needs improvements

              // console.log({ propertyName, value });

              const checkboxName = [...pathToData.split('..'), actionId, propertyName, rowName];
              const values = get(modifiedData, checkboxName, null);
              console.log({ values });

              return (
                <CheckboxWithCondition
                  key={label}
                  name="{checkboxName.join('..')}"
                  // onChange={handleChangeSimpleCheckbox}
                  // value={checkBoxValue}
                />
              );
            })}
          </Flex>
        </Flex>
      </Wrapper>
      {isActive && (
        <SubActionRow
          propertyActions={propertyActions}
          values={recursiveValues}
          pathToData={pathToData}
          propertyName={propertyName}
          rowName={rowName}
        />
      )}
    </>
  );
};

ActionRow.defaultProps = {
  required: false,
};

ActionRow.propTypes = {
  rowName: PropTypes.string.isRequired,
  pathToData: PropTypes.string.isRequired,
  propertyActions: PropTypes.array.isRequired,
  propertyName: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
};

export default memo(ActionRow);
