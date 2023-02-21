import { RootDispatch, RootState } from "../reducers/store";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar as VKUISnackbar, Avatar } from "@vkontakte/vkui";
import { setSnackbar } from "../reducers/app.reducer";
import { Icon16Cancel, Icon16InfoCircle, Icon16Linked } from "@vkontakte/icons";
import styled from "@emotion/styled";

const StyledSnackbar = styled(VKUISnackbar)<{ type: string }>(({ type }) => ({
  ".vkuiEpic &.vkuiSnackbar": {
    ...(type === "url" && {
      paddingBottom: "var(--safe-area-inset-bottom, 0)",
    }),
  },
}));

export const Snackbar = () => {
  const dispatch: RootDispatch = useDispatch();
  const { snackbar } = useSelector((state: RootState) => state.app);

  if (!snackbar) return null;

  return (
    <StyledSnackbar
      type={snackbar.type}
      onClose={() => dispatch(setSnackbar(null))}
      before={
        <>
          {snackbar.type === "error" && (
            <Avatar size={24} style={{ background: "var(--destructive)" }}>
              <Icon16Cancel fill="#ffffff" width={14} height={14} />
            </Avatar>
          )}
          {snackbar.type === "info" && (
            <Avatar size={24} style={{ background: "var(--accent)" }}>
              <Icon16InfoCircle fill="#ffffff" width={14} height={14} />
            </Avatar>
          )}
        </>
      }
    >
      {snackbar.text}
    </StyledSnackbar>
  );
};

export default Snackbar;
