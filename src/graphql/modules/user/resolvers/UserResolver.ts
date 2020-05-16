import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '@root/entities';
import { UserProvider } from '../providers';
import { UserResult } from '../types/results';

@Resolver(() => User)
export class UserResolver {
  constructor(private userProvider: UserProvider) {
    this.userProvider = userProvider;
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userProvider.getUsers();
  }

  @Query(() => UserResult)
  user(@Arg('id') id: string): Promise<typeof UserResult> {
    return this.userProvider.getUser(id);
  }
}
