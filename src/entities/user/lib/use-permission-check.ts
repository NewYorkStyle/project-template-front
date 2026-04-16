import {useCallback} from 'react';

import {useUsersControllerGetMyPermissions} from '@api/endpoints/users';

import {type E_PERMISSIONS} from './constants';

export const usePermissionCheck = () => {
  const {data: permissions = [], queryKey: permissionsQueryKey} =
    useUsersControllerGetMyPermissions({
      query: {
        staleTime: 10 * 60 * 1000,
      },
    });

  const hasPermission = useCallback(
    (permission: E_PERMISSIONS) => {
      return (permissions as E_PERMISSIONS[]).includes(permission);
    },
    [permissions]
  );

  const hasAnyPermission = useCallback(
    (requiredPermissions: E_PERMISSIONS[]) => {
      return requiredPermissions.some((permission) =>
        (permissions as E_PERMISSIONS[]).includes(permission)
      );
    },
    [permissions]
  );

  const hasAllPermissions = useCallback(
    (requiredPermissions: E_PERMISSIONS[]) => {
      return requiredPermissions.every((permission) =>
        (permissions as E_PERMISSIONS[]).includes(permission)
      );
    },
    [permissions]
  );

  return {
    permissions,
    permissionsQueryKey,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
