from typing import Sequence
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.core.dependencies.db import get_async_session
from src.models.feature import Feature
from src.repositories.feature_repository import FeatureRepository
from src.services.requirement_service import RequirementService


class FeatureService:
    
    def __init__(self, session: AsyncSession = Depends(get_async_session)):
        self.session = session
        self.repository = FeatureRepository(self.session)
        self.requirement_service = RequirementService(self.session)

    async def add(self, feature_data: dict) -> Feature:
        feature = Feature(**feature_data)
        feature = self.repository.add(feature)
        await self.session.commit()
        return feature


    async def get_by_id_or_none(self, id: str) -> Feature:
        feature = await self.repository.get(id)

        if not feature:
            raise HTTPException(status_code=404, detail='feature not found')

        return feature

    async def get_all(self) -> Sequence[Feature]:
        return await self.repository.get_all()

    async def update(self, id: str, update_data: dict) -> Feature:
        feature = await self.get_by_id_or_none(id)
        updated_feature = await self.repository.update(feature, update_data)
        await self.session.commit()
        return updated_feature

    async def delete(self, id: str) -> None:
        feature = await self.get_by_id_or_none(id)
        await self.repository.delete(feature)
        await self.session.commit()

    async def add_requirement_to_feature(self, feature_id: str, requirement_id: str) -> Feature:
        feature = await self.get_by_id_or_none(feature_id)
        requirement = await self.requirement_service.get_by_id_or_none(requirement_id)
        
        if requirement not in feature.requirements:
            feature.requirements.append(requirement)
        else:
            raise ValueError(f'Requirement with ID {requirement_id} is already added to this feature')

        await self.session.commit()

        return feature
