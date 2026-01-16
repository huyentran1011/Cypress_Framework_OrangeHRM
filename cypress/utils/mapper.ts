export const mapGender = (value: any): string => {
  const map: Record<number, string> = {
    1: 'Male',
    2: 'Female'
  };
  return map[Number(value)] ?? '';
};

export const mapUsernameStatus = (value: any): number | 1 => {
  const map: Record<string, number> = {
    Disabled: 0,
    Enabled: 1
  };
  return map[value] ?? 1;
};

export const mapUsernameRoleID = (value: any): number | 2 => {
  const map: Record<string, number> = {
    Admin: 1,
    ESS: 2
  };
  return map[value] ?? 2;
};
