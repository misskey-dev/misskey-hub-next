# Roles

Roles are attributes assigned to users that allow you to display badges and assign permissions using policy settings.

Role assignment can be done manually or automatically based on specified conditions.

A user can have multiple roles at once.

## Role Template

You can set policies that will be applied by default to all users in the role template (base role) settings.

You can set the role template in the control panel under "Roles > Role Template".

## Assignment Type

You can set a role to be assigned manually or automatically.

- **Manual:** Manually assign and unassign users.(Manual Role)
    - You can also set a length of time for the assignment.
- **Conditional:** Set conditions for assignment. Users who meet the conditions will be assigned automatically.(Automatic Role)

:::warning

Compared to manual roles, conditional roles have the following limitations:

- Conditional roles cannot be manually assigned/unassigned
- There is no way to view a list of users assigned a conditional role

:::

## Permissions

Each role can be given the following base permissions:

- **Normal User:**  No special permissions
- **Moderator:** Can perform basic moderation operations
- **Administrator:** Can change all settings of the instance

More detailed permissions can be set under Policies.

## Policies

Role policies can be adjusted to implement permissions and feature restrictions.

Policies can also be set to inherit the values from the role template.

### Priority

If multiple roles are assigned and the same policy is defined with different values for each role, priorities can be assigned to each policy to determine which policy prevails. Policies with higher priority override those with lower priority.

Priority is assigned by policy, not by role.Role templates cannot have priorities.

**If the priorities for a policy are the same, the largest or most permissive value prevails by default.**

:::tip

For example, suppose a user is assigned roles A and B. The Drive capacity policy for role A is set to 500MB and the Drive capacity policy for role B is set to 300MB.

- If the priority for this policy on role A is higher or the priorities are the same, then the user will have 500MB of Drive capacity.
- If the priority for this policy on role B is higher, then the user will have 300MB of Drive capacity.

Additionally, suppose the user is also assigned roles C and D. Role C has the "Can send public notes" policy set to "No" while role D has the same policy set to "Yes".

- If the priority for this policy on role D is higher or the priorities are the same, then the user will have the policy set to "Yes".
- If the priority for this policy on role C is higher, then the user will have the policy set to "No".

:::

### Use role template value

Enable this setting to inherit the policy's value from the role template.

## Creating Roles

New roles can be created from "Roles" in the Control Panel.

## View, Edit, or Delete Role Details

Roles can be edited under "Roles" in the Control Panel.

## Assigning and Unassigning Roles to Users

Roles can be assigned to users under "Moderation > Roles".

You can also assign roles directly from the user's menu.

You can set a length of time to assign the role.

:::tip

It may take some time for changes to role assignment to take effect.

:::

:::warning

Conditional roles cannot be manually assigned.

:::

## Checking a User's Policies

A user's policies can be viewed under "Moderation > Overview > Policies".
