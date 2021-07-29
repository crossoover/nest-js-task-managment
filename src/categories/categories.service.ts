/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  getCategories(user: User): Promise<Category[]> {
    return this.categoriesRepository.getCategories(user);
  }

  async getCategoryById(id: string, user: User): Promise<Category> {
    const found = await this.categoriesRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Category with id "${id}" does not exist.`);
    }
    return found;
  }

  createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
  ): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto, user);
  }

  async deleteCategory(id: string, user: User): Promise<void> {
    const result = await this.categoriesRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Category with id "${id}" does not exist.`);
    }
  }
  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<Category> {
    const { name, color, base64Image } = updateCategoryDto;
    const category = await this.getCategoryById(id, user);

    category.name = name;
    category.color = color;
    category.base64Image = base64Image;

    await this.categoriesRepository.save(category);

    return category;
  }
}
