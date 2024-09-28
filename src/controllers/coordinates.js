import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createCoordinates = async (req, res) => {
  const { teamName, latitude1, longitude1, latitude2, longitude2, latitude3, longitude3, latitude4, longitude4, bandobastId } = req.body;

  try {
    console.log('Received data:', req.body); // Log the received data

    const newCoordinates = await prisma.coordinates.create({
      data: {
        teamName,
        latitude1,
        longitude1,
        latitude2,
        longitude2,
        latitude3,
        longitude3,
        latitude4,
        longitude4,
        bandobastId,
      },
    });

    res.status(201).json(newCoordinates);
  } catch (error) {
    console.error('Error creating coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCoordinates = async (req, res) => {
  try {
    const coordinates = await prisma.coordinates.findMany();
    console.log('Fetched coordinates:', coordinates); // Log the fetched coordinates
    res.status(200).json(coordinates);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getCoordinate = async (req, res) => {
  const { id } = req.params;

  try {
    const coordinate = await prisma.coordinates.findUnique({
      where: { id },
    });

    if (!coordinate) {
      return res.status(404).json({ message: 'Coordinates not found' });
    }

    res.status(200).json(coordinate);
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCoordinates = async (req, res) => {
  const { id } = req.params;
  const { teamName, latitude1, longitude1, latitude2, longitude2, latitude3, longitude3, latitude4, longitude4, bandobastId } = req.body;

  try {
    const updatedCoordinates = await prisma.coordinates.update({
      where: { id },
      data: {
        teamName,
        latitude1,
        longitude1,
        latitude2,
        longitude2,
        latitude3,
        longitude3,
        latitude4,
        longitude4,
        bandobastId,
      },
    });

    res.status(200).json(updatedCoordinates);
  } catch (error) {
    console.error('Error updating coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteCoordinates = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.coordinates.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting coordinates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};