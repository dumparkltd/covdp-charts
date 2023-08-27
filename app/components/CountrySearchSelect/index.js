import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextInput, Box, Drop, Button, Text } from 'grommet';
import { Search, FormClose } from 'grommet-icons';

import {
  regExMultipleWords,
  startsWith,
  lowerCase,
  cleanupSearchTarget,
} from 'utils/string';

const InputWraper = styled(p => (
  <Box
    direction="row"
    gap="small"
    align="center"
    pad={{ horizontal: 'xsmall' }}
    {...p}
  />
))`
  border: 1px solid #041733;
  min-width: 400px;
`;
// prettier-ignore
const ButtonOption = styled(p => <Button plain {...p} />)`
  &:hover {
    background-color: ${({ theme }) =>
    theme.global.colors.buttonActiveBG} !important;
  }
`;
// prettier-ignore
const ButtonSelected = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: pointer;
  font-family: 'ABCMonumentBold';
  padding: 3px 5px 3px 10px;
  background-color: ${({ theme }) => theme.global.colors.buttonActiveBG};
  &:hover {
    background-color: ${({ theme }) =>
    theme.global.colors.buttonHoverBG} !important;
  }
`;
const StyledTextInput = styled(p => <TextInput {...p} />)`
  border: none;
  font-size: ${({ theme }) => theme.text.small.size};
`;

const Hint = styled(p => <Text {...p} />)``;

export const filterCountry = (country, search) => {
  if (!search || search.length < 2) return true;
  try {
    const regex = new RegExp(regExMultipleWords(search), 'i');
    return (
      startsWith(lowerCase(country.id), lowerCase(search)) ||
      regex.test(cleanupSearchTarget(country.label))
    );
  } catch (e) {
    return true;
  }
};

export function CountrySearchSelect({ selected, onSelect, options }) {
  const targetRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');
  const optionsFiltered =
    search !== '' ? options.filter(o => filterCountry(o, search)) : options;
  const hasSearch = search.length > 0;

  return (
    <Box ref={targetRef}>
      {selected && (
        <ButtonSelected
          onClick={() => {
            onSelect(null);
          }}
        >
          <Box direction="row" gap="xsmall" align="center" justify="between">
            <Text size="large">{selected.label}</Text>
            <FormClose color="black" />
          </Box>
        </ButtonSelected>
      )}
      {!selected && (
        <InputWraper>
          <StyledTextInput
            type="text"
            placeholder="Search by name or iso code"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setShowOptions(true)}
          />
          {!hasSearch && <Search />}
          {hasSearch && (
            <Button plain onClick={() => setSearch('')}>
              <FormClose />
            </Button>
          )}
        </InputWraper>
      )}
      {showOptions && targetRef.current && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={targetRef.current}
          onClickOutside={() => setShowOptions(false)}
        >
          <Box>
            {optionsFiltered &&
              optionsFiltered.length > 0 &&
              optionsFiltered.map(o => (
                <ButtonOption
                  plain
                  key={o.id}
                  onClick={() => {
                    onSelect(o.id);
                    setShowOptions(false);
                  }}
                >
                  <Box pad={{ vertical: 'small', horizontal: 'xsmall' }}>
                    <Text size="small">{o.label}</Text>
                  </Box>
                </ButtonOption>
              ))}
            {(!optionsFiltered || optionsFiltered.length === 0) && (
              <Box pad="small">
                <Hint color="textSecondary">No countries or areas found</Hint>
              </Box>
            )}
          </Box>
        </Drop>
      )}
    </Box>
  );
}

CountrySearchSelect.propTypes = {
  selected: PropTypes.object,
  onSelect: PropTypes.func,
  options: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

export default CountrySearchSelect;
