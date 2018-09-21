import styled from 'styled-components';
import { fadeIn } from '../../styleUtils/keyframes';

export const InfoSection = styled.section`
  margin-bottom: calc(var(--spacing-factor) * 3);
  margin-top: var(--spacing-factor);
  padding: calc(var(--spacing-factor) * 5);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  color: ${props => props.color || `var(--dark-blue)`};
  font-size: 24px;
  font-weight: bold;
  opacity: 0;
  box-shadow: 2px 3px 10px var(--white-gray), 0 3px 6px var(--light-gray);
  transform: scale(0.95);
  animation: ${fadeIn} 1s;
  animation-fill-mode: forwards;

  .message {
    margin: 0 0 0 calc(var(--spacing-factor) * 2);
    font-size: 18px;
    font-weight: bolder;
  }
`;

InfoSection.displayName = 'InfoSection';
