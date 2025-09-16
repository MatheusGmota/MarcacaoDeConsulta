import styled from "styled-components/native";
import theme from "../../styles/theme";
import { StyledProps } from "./interface/interface";
import { ListItem } from "react-native-elements";

export const styles = {
    scrollContent: {
        padding: 20,
    },
    button: {
        marginBottom: 20,
        width: '100%',
    },
    buttonStyle: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
    },
    backButton: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 12,
    },
    actionButton: {
        marginTop: 8,
        width: '48%',
    },
    editButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 8,
    },
    deleteButton: {
        backgroundColor: theme.colors.error,
        paddingVertical: 8,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
    },
    userEmail: {
        fontSize: 14,
        color: theme.colors.text,
        marginTop: 4,
    },
};

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const UserCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

export const RoleBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => {
        switch (props.role) {
            case 'admin':
                return theme.colors.primary + '20';
            case 'doctor':
                return theme.colors.success + '20';
            default:
                return theme.colors.secondary + '20';
        }
    }};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const RoleText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => {
        switch (props.role) {
            case 'admin':
                return theme.colors.primary;
            case 'doctor':
                return theme.colors.success;
            default:
                return theme.colors.secondary;
        }
    }};
  font-size: 12px;
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;