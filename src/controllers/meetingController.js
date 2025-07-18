import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createMeeting = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body

    const { receiverId, name, date, time, location, agenda, creatorId } = req.body;

    if (!receiverId || !name || !date || !time || !location || !agenda || !creatorId) {
      console.log("Missing fields:", { receiverId, name, date, time, location, agenda, creatorId }); // Log missing fields
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if receiverId exists in Admin table
    const receiverExists = await prisma.admin.findUnique({
      where: { id: receiverId },
    });

    if (!receiverExists) {
      return res.status(400).json({ error: "Invalid receiverId" });
    }

    // Check if creatorId exists in Admin table
    const creatorExists = await prisma.admin.findUnique({
      where: { id: creatorId },
    });

    if (!creatorExists) {
      return res.status(400).json({ error: "Invalid creatorId" });
    }

    const newMeeting = await prisma.meeting.create({
      data: {
        creatorId,
        receiverId,
        name,
        date: new Date(date),
        time: new Date(time), // Ensure time is also a Date object
        location,
        agenda,
      },
    });

    console.log('Created meeting:', newMeeting);
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await prisma.meeting.findMany();
    res.status(200).json(meetings);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMeeting = async (req, res) => {
  const { id } = req.params;

  try {
    const meeting = await prisma.meeting.findUnique({
      where: { id },
    });

    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error fetching meeting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateMeeting = async (req, res) => {
  const { id } = req.params;
  const { creatorId, receiverId, name, date, time, location, agenda } = req.body;

  try {
    const updatedMeeting = await prisma.meeting.update({
      where: { id },
      data: { creatorId, receiverId, name, date: new Date(date), time: new Date(time), location, agenda },
    });

    res.status(200).json(updatedMeeting);
  } catch (error) {
    console.error('Error updating meeting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteMeeting = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.meeting.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting meeting:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};