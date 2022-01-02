import { InputType, Field } from "type-graphql";

@InputType()
export class EditCategoryForm {
  @Field()
  name: string;

  @Field()
  description?: string;
}
