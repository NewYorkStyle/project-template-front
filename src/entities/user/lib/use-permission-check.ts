import {useCallback} from 'react';

import {usePermissions} from '../api';

import {type E_PERMISSIONS} from './constants';

export const usePermissionCheck = () => {
  const {data: permissions = []} = usePermissions();

  const hasPermission = useCallback(
    (permission: E_PERMISSIONS) => {
      return permissions.includes(permission);
    },
    [permissions]
  );

  const hasAnyPermission = useCallback(
    (requiredPermissions: E_PERMISSIONS[]) => {
      return requiredPermissions.some((permission) =>
        permissions.includes(permission)
      );
    },
    [permissions]
  );

  const hasAllPermissions = useCallback(
    (requiredPermissions: E_PERMISSIONS[]) => {
      return requiredPermissions.every((permission) =>
        permissions.includes(permission)
      );
    },
    [permissions]
  );

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
