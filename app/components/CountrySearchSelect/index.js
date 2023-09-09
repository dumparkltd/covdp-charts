import React, { useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TextInput,
  Box,
  Drop,
  Button,
  Text,
  ResponsiveContext,
  Layer,
} from 'grommet';
import { Search, FormClose, FormDown, Close } from 'grommet-icons';
import { isMinSize } from 'utils/responsive';

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
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    min-width: 400px;
    width: auto;
  }
`;
// prettier-ignore
const ButtonOption = styled(p => <Button plain {...p} />)`
  &:hover {
    background-color: ${({ theme }) =>
    theme.global.colors.buttonBG} !important;
  }
`;
// prettier-ignore
const ButtonSelected = styled(p => <Button plain {...p} />)`
  fill: transparent;
  cursor: pointer;
  font-family: 'ABCMonumentBold';
  padding: 3px 2px 3px 6px;
  color: ${({ theme, active }) =>
    active ? theme.global.colors.white : theme.global.colors.black};
  background-color: ${({ theme, active }) =>
    active ? theme.global.colors.buttonActiveBG : theme.global.colors.buttonBG};
  &:hover {
    background-color: ${({ theme, active }) =>
    active ? theme.global.colors.buttonBG : theme.global.colors.buttonHoverBG} !important;
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    padding: 3px 5px 3px 10px;
  }
`;
const ButtonSelectedText = styled(p => <Text {...p} />)`
  font-size: ${({ theme }) => theme.text.xsmall.size};
  line-height: ${({ theme }) => theme.text.xsmall.height};
  @media (min-width: ${({ theme }) => theme.breakpointsMin.small}) {
    font-size: ${({ theme }) => theme.text.small.size};
    line-height: ${({ theme }) => theme.text.small.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
    font-size: ${({ theme }) => theme.text.medium.size};
    line-height: ${({ theme }) => theme.text.medium.height};
  }
  @media (min-width: ${({ theme }) => theme.breakpointsMin.large}) {
    font-size: ${({ theme }) => theme.text.large.size};
    line-height: ${({ theme }) => theme.text.large.height};
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
  const size = useContext(ResponsiveContext);
  const targetRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [search, setSearch] = useState('');
  let optionsFiltered =
    search !== '' ? options.filter(o => filterCountry(o, search)) : options;
  const hasSearch = search.length > 0;
  optionsFiltered =
    optionsFiltered &&
    optionsFiltered.sort((a, b) => (a.label > b.label ? 1 : -1));

  return (
    <Box ref={targetRef}>
      {selected && (
        <ButtonSelected
          active
          onClick={() => {
            onSelect(null);
            setSearch('');
          }}
        >
          <Box direction="row" gap="xsmall" align="center" justify="between">
            <ButtonSelectedText>{selected.label}</ButtonSelectedText>
            <FormClose color="white" />
          </Box>
        </ButtonSelected>
      )}
      {!isMinSize(size, 'medium') && !selected && (
        <ButtonSelected onClick={() => setShowOptions(true)}>
          <Box direction="row" gap="hair" align="center" justify="between">
            <ButtonSelectedText>Country or area</ButtonSelectedText>
            <FormDown color="black" size="small" />
          </Box>
        </ButtonSelected>
      )}
      {isMinSize(size, 'medium') && !selected && (
        <InputWraper>
          <StyledTextInput
            type="text"
            placeholder=""
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
      {!isMinSize(size, 'medium') && showOptions && (
        <Layer full>
          <Box
            margin={{ top: 'small', horizontal: 'small' }}
            pad={{ vertical: 'xlarge' }}
            style={{ overflowY: 'auto' }}
          >
            <Box
              flex={{ shrink: 0 }}
              direction="row"
              gap="small"
              align="center"
              pad={{ vertical: 'medium', horizontal: 'small' }}
              elevation="xsmall"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                left: 0,
                background: 'white',
              }}
            >
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
              <Button plain onClick={() => setShowOptions(false)}>
                <Close color="black" />
              </Button>
            </Box>
            <Box flex={{ shrink: 0 }} margin={{ top: 'small' }}>
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
                    <Box pad={{ vertical: 'xsmall', horizontal: 'xsmall' }}>
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
          </Box>
        </Layer>
      )}
      {isMinSize(size, 'medium') && showOptions && targetRef.current && (
        <Drop
          align={{ top: 'bottom', left: 'left' }}
          target={targetRef.current}
          onClickOutside={() => setShowOptions(false)}
          onEsc={() => setShowOptions(false)}
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
                  <Box pad={{ vertical: 'xsmall', horizontal: 'xsmall' }}>
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
