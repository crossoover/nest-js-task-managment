/* eslint-disable prettier/prettier */
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async getCategories(user: User): Promise<Category[]> {
    const query = this.createQueryBuilder('category');
    query.where({ user });
    const categories = await query.getMany();
    return categories;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    const { name, color, base64Image } = createCategoryDto;

    const category = this.create({
      name,
      color,
      base64Image,
      user,
    });

    await this.save(category);
    return category;
  }
}
